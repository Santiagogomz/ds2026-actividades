/* eslint-disable react-refresh/only-export-components */
import {
  Children,
  createContext,
  isValidElement,
  type AnchorHTMLAttributes,
  type ReactElement,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type RouterContextValue = {
  path: string;
  navigate: (to: string, options?: { replace?: boolean }) => void;
};

type RouteProps = {
  path?: string;
  element: ReactNode;
  children?: ReactNode;
};

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
};

const RouterContext = createContext<RouterContextValue>({
  path: window.location.pathname,
  navigate: () => {},
});

const ParamsContext = createContext<Record<string, string>>({});
const OutletContext = createContext<ReactNode>(null);

function matchPath(routePath: string, currentPath: string) {
  const routeParts = routePath.split('/').filter(Boolean);
  const currentParts = currentPath.split('/').filter(Boolean);

  if (routeParts.length !== currentParts.length) {
    return null;
  }

  const params: Record<string, string> = {};

  for (let index = 0; index < routeParts.length; index += 1) {
    const routePart = routeParts[index];
    const currentPart = currentParts[index];

    if (routePart.startsWith(':')) {
      params[routePart.slice(1)] = currentPart;
    } else if (routePart !== currentPart) {
      return null;
    }
  }

  return params;
}

export function BrowserRouter({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);

    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const value = useMemo(
    () => ({
      path,
      navigate: (to: string, options?: { replace?: boolean }) => {
        if (options?.replace) {
          window.history.replaceState({}, '', to);
        } else {
          window.history.pushState({}, '', to);
        }
        setPath(to);
      },
    }),
    [path],
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function Routes({ children }: { children: ReactNode }) {
  const { path } = useContext(RouterContext);

  const renderRoutes = (routes: ReactNode): ReactNode => {
    const routeElements = Children.toArray(routes).filter(
      (child): child is ReactElement<RouteProps> =>
        isValidElement<RouteProps>(child),
    );

    const rutasEstaticas = routeElements.filter(
      (child) => child.props.path && !child.props.path.includes(':'),
    );
    const layouts = routeElements.filter((child) => !child.props.path);
    const rutasDinamicas = routeElements.filter(
      (child) => child.props.path?.includes(':'),
    );

    for (const child of [...rutasEstaticas, ...layouts, ...rutasDinamicas]) {

      if (child.props.path) {
        const params = matchPath(child.props.path, path);

        if (params) {
          return (
            <ParamsContext.Provider value={params}>
              {child.props.element}
            </ParamsContext.Provider>
          );
        }

        continue;
      }

      const outlet = renderRoutes(child.props.children);

      if (outlet) {
        return (
          <OutletContext.Provider value={outlet}>
            {child.props.element}
          </OutletContext.Provider>
        );
      }
    }

    return null;
  };

  return renderRoutes(children);
}

export function Route(props: RouteProps) {
  void props;

  return null;
}

export function Outlet() {
  return useContext(OutletContext);
}

export function Navigate({
  to,
  replace = false,
}: {
  to: string;
  replace?: boolean;
}) {
  const { navigate } = useContext(RouterContext);

  useEffect(() => {
    navigate(to, { replace });
  }, [navigate, replace, to]);

  return null;
}

export function Link({ to, onClick, ...props }: LinkProps) {
  const { navigate } = useContext(RouterContext);

  return (
    <a
      {...props}
      href={to}
      onClick={(event) => {
        onClick?.(event);

        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.altKey ||
          event.ctrlKey ||
          event.shiftKey
        ) {
          return;
        }

        event.preventDefault();
        navigate(to);
      }}
    />
  );
}

export function useParams() {
  return useContext(ParamsContext);
}

export function useNavigate() {
  const { navigate } = useContext(RouterContext);

  return navigate;
}

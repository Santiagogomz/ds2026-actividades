/* eslint-disable react-refresh/only-export-components */
import {
  Children,
  createContext,
  isValidElement,
  type AnchorHTMLAttributes,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type RouterContextValue = {
  path: string;
  navigate: (to: string) => void;
};

type RouteProps = {
  path: string;
  element: ReactNode;
};

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
};

const RouterContext = createContext<RouterContextValue>({
  path: window.location.pathname,
  navigate: () => {},
});

const ParamsContext = createContext<Record<string, string>>({});

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
      navigate: (to: string) => {
        window.history.pushState({}, '', to);
        setPath(to);
      },
    }),
    [path],
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function Routes({ children }: { children: ReactNode }) {
  const { path } = useContext(RouterContext);

  for (const child of Children.toArray(children)) {
    if (!isValidElement<RouteProps>(child)) {
      continue;
    }

    const params = matchPath(child.props.path, path);

    if (params) {
      return <ParamsContext.Provider value={params}>{child.props.element}</ParamsContext.Provider>;
    }
  }

  return null;
}

export function Route(props: RouteProps) {
  void props;

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

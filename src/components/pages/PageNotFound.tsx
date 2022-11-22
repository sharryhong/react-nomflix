interface IProps {
  location: { pathname: "string" };
}

function PageNotFound({ location }: IProps) {
  return (
    <P>
      Page not found - the path, <code>{location.pathname}</code>, did not match
      any React Router routes.
    </P>
  );
}

export default PageNotFound;

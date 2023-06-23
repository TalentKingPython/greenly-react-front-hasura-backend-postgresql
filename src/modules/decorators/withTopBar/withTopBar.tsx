import { CategoryBar } from 'uiCore/components/CategoryBar';
import { Navbar } from 'uiCore/components/Navbar';

interface WithTopBarProps {
  navbar?: boolean;
  categoryBar?: boolean;
}

export const withTopBar = (
  Component: React.ComponentType,
  { navbar = true, categoryBar = true }: WithTopBarProps = {}
) => {
  return () => {
    return (
      <>
        {navbar && <Navbar variant="primary" />}
        {categoryBar && <CategoryBar variant="primary" />}
        <Component />
      </>
    );
  };
};

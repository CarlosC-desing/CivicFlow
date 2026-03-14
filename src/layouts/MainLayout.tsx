import { Navbar } from "../components/Navbar/Navbar";

interface Props {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  return (
    <div className="layout-container">
      <Navbar/>
      <main>
        {children}
      </main>
    </div>
  );
};
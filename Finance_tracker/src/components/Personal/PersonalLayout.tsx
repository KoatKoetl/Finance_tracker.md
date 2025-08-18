import { Outlet } from "react-router-dom";
import StaticSidebar from "../SidebarMenu/SidebarMenu";

const PersonalLayout = () => {
  return (
    <section>
      <div className="wrapper flex mt-6 mb-6">
        <div className="sidebar_menu">
          <StaticSidebar></StaticSidebar>
        </div>
        <div className="sidebar_content mx-2  md:mx-4">
          <Outlet></Outlet>
        </div>
      </div>
    </section>
  );
};

export default PersonalLayout;

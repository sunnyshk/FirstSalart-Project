import { BigSidebar, SmallSidebar, NavBar } from "../../components";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { Outlet } from "react-router-dom";
const SharedLayout = () => {
  return <Wrapper>
    <main className="dashboard">
      <SmallSidebar />
      <BigSidebar />
      <div>
        <NavBar />
        <div className="dashboard-page">
          <Outlet />
        </div>
      </div>
    </main>
  </Wrapper>;
};

export default SharedLayout;

import { Outlet } from 'react-router-dom';
// import TopBar from '../components/TopBar';
import TopBar from './TopBar';
export const Layout = () => {
    return (
        <div>
            <TopBar />
            <div>
                <Outlet />
            </div>
            
        </div>
    );
};

export default Layout;

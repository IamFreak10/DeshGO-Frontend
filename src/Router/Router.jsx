import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layouts/RootLayout';
import DarkMode from '../Shared/DarkMode/DarkMode';
import Home from '../PAges/Home/Home';
import AuthLayout from '../Layouts/AuthLayout';
import Community from '../PAges/Home/Commiunity/Community';
import Login from '../PAges/AuthPages/Login/Login';
import Register from '../PAges/AuthPages/Register/Register';
import PrivateRoutes from '../Routes/PrivateRoutes';
import DashbordLayout from '../Layouts/DashbordLayout';
import AddPackage from '../PAges/Admin/AddPacakage';
import JoinGuide from '../PAges/TourGuide/JoinGuide';
import ManageCandidates from '../PAges/Admin/ManageCandidates';
import PackageDetails from '../PAges/DetailsPages/PacakgeDetails/PacakgeDetails';
import MyBooking from '../PAges/Tourist/MyBooking';
export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'community',
        Component: Community,
      },
      {
        path: 'package/:id',
        Component: PackageDetails,
      },
    ],
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
    ],
  },
  {
    path: 'dashboard',
    element: (
      <PrivateRoutes>
        <DashbordLayout></DashbordLayout>
      </PrivateRoutes>
    ),
    children: [
      {
        path: 'add-package',
        Component: AddPackage,
      },
      {
        path: 'join-as-tour-guide',
        Component: JoinGuide,
      },
      {
        path: 'manage-candidates',
        Component: ManageCandidates,
      },{
        path:'my-bookings',
        Component:MyBooking

      },{
        path:'/payment/:id',
      }
    ],
  },
]);

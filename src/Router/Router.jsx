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
import Payment from '../PAges/Tourist/PaymentStripe/Payment';
import PaymentWrapper from '../PAges/Tourist/PaymentStripe/PaymentWrapper';
import Unauthorized from '../Shared/UnAuthorizedPAges/Unauthorized';
import AdminRoutes from '../Routes/AdminRoutes';
import MyAssignedTour from '../PAges/TourGuide/MyAssignedTour';
import TourGuideRoute from '../Routes/TourGuideRoute';
import ShareStory from '../Shared/ShareStories/ShareStory';
import ManageStory from '../Shared/ShareStories/ManageStory';
import EditStory from '../Shared/ShareStories/EditStory';
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
        element: (
          <AdminRoutes>
            <AddPackage></AddPackage>
          </AdminRoutes>
        ),
      },
      {
        path: 'join-as-tour-guide',
        element: (
          <PrivateRoutes>
            <JoinGuide></JoinGuide>
          </PrivateRoutes>
        ),
      },
      {
        path: 'manage-candidates',
        element: (
          <AdminRoutes>
            <ManageCandidates></ManageCandidates>
          </AdminRoutes>
        ),
      },
      {
        path: 'my-bookings',
        element: (
          <PrivateRoutes>
            <MyBooking></MyBooking>
          </PrivateRoutes>
        ),
      },
      {
        path: 'payment/:id',
        Component: PaymentWrapper,
      },
      {
        path: 'unAuthorized',
        Component: Unauthorized,
      },
      {
        path: 'my-assigned-tours',
        element: (
         <TourGuideRoute>
          <MyAssignedTour></MyAssignedTour>
         </TourGuideRoute>
        ),
      },{
        path:'add-stories',
        element:<PrivateRoutes><ShareStory></ShareStory></PrivateRoutes>
      },{
        path:'manage-stories',
        element:<PrivateRoutes><ManageStory></ManageStory></PrivateRoutes>
      },{
        path:'edit/:id',
        element:<PrivateRoutes><EditStory></EditStory></PrivateRoutes>
      }
    ],
  },
]);

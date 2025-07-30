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
import ManageUsers from '../PAges/Admin/ManageUsers';
import ManageProfile from '../Shared/ManageProfile.jsx/ManageProfile';
import TouristProfile from '../PAges/Tourist/TouristProfile';
import StoryDetails from '../PAges/DetailsPages/StoryDetails/StoryDetails';
import Trips from '../PAges/Home/Trips/Trips';
import AboutUs from '../PAges/Admin/AboutUs';
import Forbidden from '../Shared/Forbidden/Forbidden';
import TourGuiideDetails from '../PAges/DetailsPages/TourGuideDetails/TourGuiideDetails';
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
        path:'trips'
        ,Component:Trips

      },{
        path:'about',
        Component:AboutUs
      },
      {
        path: 'package/:id',
        Component: PackageDetails,
      },{
        path:'tourguide/:id',
        element:(
          <PrivateRoutes>
            <TourGuiideDetails></TourGuiideDetails>
          </PrivateRoutes>
        )
      },
      
      {
        path:`story/:id`,
        element:(
          <PrivateRoutes>
            <StoryDetails></StoryDetails>
          </PrivateRoutes>
        )
      },{
        path:'forbidden',
        Component:Forbidden
      }
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
        path:'manage-users',
        element:(
          <AdminRoutes>
            <ManageUsers></ManageUsers>
          </AdminRoutes>
        )
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
        path: 'manage-profile',
        // accidental naming donyt mind
        element: (
          <PrivateRoutes>
            <TouristProfile></TouristProfile>
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

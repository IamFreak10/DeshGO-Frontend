import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layouts/RootLayout';
import DarkMode from '../Shared/DarkMode/DarkMode';
import Home from '../PAges/Home/Home';
export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
        {
            index:true,
            Component:Home

        }
    ]
  },
]);

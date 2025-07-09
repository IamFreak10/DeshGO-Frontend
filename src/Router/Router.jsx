import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layouts/RootLayout';
import DarkMode from '../Shared/DarkMode/DarkMode';
export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
        {
            index:true,
            Component:DarkMode

        }
    ]
  },
]);

import { createHashRouter as createRouter } from 'react-router-dom';
import Routes from './Routes';
import StartPage from '../../pages/StartPage';
import NotFoundPage from '../../pages/NotFoundPage';
import Authenticated from '../../components/hocs/Authenticated';
import DebugPage from '../../dev/DebugPage';
import HomePage from '../../pages/HomePage';
import TestsLibraryPage from '../../pages/TestsLibraryPage/TestsLibraryPage';
import OnlyPublic from '../../components/hocs/OnlyPublic';
import HomeLayout from '../../components/layouts/HomeLayout';
import ExamsHistoryPage from '../../pages/ExamsHistoryPage/ExamsHistoryPage';
import CreateTestPage from '../../pages/CreateTestPage/CreateTestPage';
import TestPage from '../../pages/TestPage';
import LoginPage from '../../pages/Login/LoginPage';
import JoinPage from '../../pages/Login/JoinPage';
import ExamPage from '../../pages/ExamPage';

const router = createRouter([
  {
    path: Routes.START,
    element: (
      <OnlyPublic>
        <StartPage />
      </OnlyPublic>
    ),
  },
  {
    path: Routes.LOGIN,
    element: (
      <OnlyPublic>
        <LoginPage />
      </OnlyPublic>
    ),
  },
  {
    path: Routes.JOIN,
    element: (
      <OnlyPublic>
        <JoinPage />
      </OnlyPublic>
    ),
  },
  {
    path: Routes.NOT_FOUND,
    element: <NotFoundPage />,
  },
  {
    path: Routes.HOME,
    element: (
      <Authenticated>
        <HomePage />
      </Authenticated>
    ),
  },
  {
    path: 'debug',
    element: (
      <Authenticated>
        <DebugPage />
      </Authenticated>
    ),
  },
  {
    path: Routes.EXAMS_HISTORY,
    element: (
      <Authenticated>
        <ExamsHistoryPage />
      </Authenticated>
    ),
  },
  {
    path: Routes.CREATE_TEST,
    element: (
      <Authenticated>
        <CreateTestPage />
      </Authenticated>
    ),
  },
  {
    path: Routes.TESTS_LIBRARY,
    element: (
      <Authenticated>
        <TestsLibraryPage />
      </Authenticated>
    ),
  },
  {
    path: Routes.SETTINGS,
    element: (
      <Authenticated>
        <HomeLayout>Settings page</HomeLayout>
      </Authenticated>
    ),
  },
  {
    path: `${Routes.TEST}/:id`,
    element: (
      <Authenticated>
        <TestPage />
      </Authenticated>
    ),
  },
  {
    path: `${Routes.EXAM}/:id`,
    element: (
      <Authenticated>
        <ExamPage />
      </Authenticated>
    ),
  },
]);

export default router;

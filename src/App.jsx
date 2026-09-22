import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import MainLayout from "./components/layout/MainLayout";
import ProjectDetails from "./pages/ProjectDetails";
import Issues from "./pages/Issues";
import IssueDetails from "./pages/IssueDetails";
import Board from "./pages/Board";
import { IssueProvider } from "./context/IssueContext";
import ProjectIssues from "./pages/ProjectIssues";
import Backlog from "./pages/Backlog";
import Team from "./pages/Team";
import BoardOverview from "./pages/BoardOverview";
import { TeamProvider } from "./context/TeamContext";
import { ProjectProvider } from "./context/ProjectContext";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TeamProvider>
          <ProjectProvider>
            <IssueProvider>

              <Routes>

                <Route path="/login" element={<Login />} />

                <Route
                  path="/register"
                  element={<Register />}
                />

                <Route element={<ProtectedRoute />}>

                  <Route
                    path="/"
                    element={<Navigate to="/dashboard" />}
                  />

                  <Route
                    path="/dashboard"
                    element={
                      <MainLayout>
                        <Dashboard />
                      </MainLayout>
                    }
                  />

                  <Route
                    path="/projects"
                    element={
                      <MainLayout>
                        <Projects />
                      </MainLayout>
                    }
                  />

                  <Route
                    path="/projects/:projectId"
                    element={
                      <MainLayout>
                        <ProjectDetails />
                      </MainLayout>
                    }
                  />

                  <Route
                    path="/issues"
                    element={
                      <MainLayout>
                        <Issues />
                      </MainLayout>
                    }
                  />

                  <Route
                    path="/issues/:issueKey"
                    element={
                      <MainLayout>
                        <IssueDetails />
                      </MainLayout>
                    }
                  />

                  <Route
                    path="/projects/:projectId/board"
                    element={
                      <MainLayout>
                        <Board />
                      </MainLayout>
                    }
                  />

                  <Route
                    path="/projects/:projectId/issues"
                    element={
                      <MainLayout>
                        <ProjectIssues />
                      </MainLayout>
                    }
                  />

                  <Route
                    path="/projects/:projectId/backlog"
                    element={
                      <MainLayout>
                        <Backlog />
                      </MainLayout>
                    }
                  />

                  <Route
                    path="/team"
                    element={
                      <MainLayout>
                        <Team />
                      </MainLayout>
                    }
                  />

                  <Route
                    path="/board"
                    element={
                      <MainLayout>
                        <BoardOverview />
                      </MainLayout>
                    }
                  />

                </Route>


              </Routes>
            </IssueProvider>
          </ProjectProvider>
        </TeamProvider>
      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
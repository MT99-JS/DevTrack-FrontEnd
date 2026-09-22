import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    getProjects,
    createProject,
    deleteProject
} from "../api/projectApi";

const ProjectContext =
    createContext();

export function ProjectProvider({
    children
}) {

    const [projects, setProjects] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState(null);

    async function loadProjects() {

        try {

            setLoading(true);

            const data =
                await getProjects();

            setProjects(data);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);
        }
    }

    useEffect(() => {
        loadProjects();
    }, []);

async function addProject(projectData) {
    const newProject = await createProject(projectData);

    const project = {
        id: newProject.id,
        key: newProject.projectKey,
        name: newProject.name,
        description: newProject.description,
        image: newProject.image
    };

    setProjects(current => [
        ...current,
        project
    ]);
}

    async function removeProject(
        id
    ) {

        await deleteProject(id);

        setProjects(current =>
            current.filter(
                project =>
                    project.id !== id
            )
        );
    }

    return (
        <ProjectContext.Provider
            value={{
                projects,
                loading,
                error,
                addProject,
                removeProject,
                reloadProjects:
                    loadProjects
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
}

export function useProjects() {
    return useContext(ProjectContext);
}
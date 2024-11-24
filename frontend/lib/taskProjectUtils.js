export const fetchWithJson = async (endpoint, method, payload) => {
    return await fetch(endpoint, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
}
export const post = async (endpoint, payload) => await fetchWithJson(endpoint, 'POST', payload)
export const put = async (endpoint, payload) => await fetchWithJson(endpoint, 'PUT', payload)

export const fetchProjects = async setProjectsFn => {
    try {
        const response = await fetch('/projects');
        if (!response.ok)
            throw new Error(`[${response.status}]: ${response.statusText}`)
        const projects = await response.json();
        setProjectsFn(projects)
    } catch (error) {
        console.error("Error fetching projects:", error)
    }
}

export const authAndFetchProjects = async setProjectsFn => {
    if (!(await fetch('/auth')).ok) {
        window.location.replace('/login')
        return;
    }
    fetchProjects(setProjectsFn)
}

export const fetchTasks = async setTasksFn => {
    try {
        const response = await fetch('/tasks');
        if (!response.ok)
            throw new Error(`[${response.status}]: ${response.statusText}`)
        const tasks = await response.json();
        const taskMap = Object.fromEntries(tasks.map(task => [task.id, task]))
        setTasksFn(taskMap)
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

export const valueToPriority = {
    0: 'No Priority',
    1: 'Low',
    2: 'Medium',
    3: 'High',
}
// swap keys and values
export const priorityToValue = Object.fromEntries(Object.entries(valueToPriority).map(([k, v]) => [v, k]))

export const getProject = (projects, projectId) => projects.find(project => project.id === projectId)

const getProjectName = (projects, projectId) => {
    const project = getProject(projects, projectId)
    return project ? project.name : 'Unknown Project'
}

export const formatTasks = (taskMap, projects, selectedProject) => {
    return Object.values(taskMap)
    .filter(task => selectedProject ? task.projectId === selectedProject.id : true)
    .map(task => {
        return {
            id: task.id,
            completed: task.status === 1,
            title: task.name,
            project: getProjectName(projects, task.projectId),
            dueDate: task.dueDate || 'No Due Date',
            priority: valueToPriority[task.priority],
        }
    })
}
import { getFullProject } from "@/api/ProjectAPI"
import AddTaskModal from "@/components/tasks/AddTaskModal"
import EditTaskData from "@/components/tasks/EditTaskData"
import TaskList from "@/components/tasks/TaskList"
import TaskModalDetails from "@/components/tasks/TaskModalDetails"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "@/hooks/useAuth"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { isManager } from "@/utils/policies"
import { useMemo } from "react"

export default function ProjectDetailsView() {
    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const { data: user, isLoading: authLoading } = useAuth()

    const { data, isLoading, isError } = useQuery({
        queryKey: ['project', projectId],
        queryFn: () => getFullProject(projectId),
        retry: false
    })

    const canEdit = useMemo(()=> data?.manager === user?._id, [data,user])    

    if (isLoading && authLoading) return 'Cargando'
    if (isError) return <Navigate to='/404' />
    if (data && user) return (
        <>
            <h1 className="text-5xl font-black">{data.projectName}</h1>
            <p className="text-2xl font-ligth text-gray-500 mt-5">{data.description}</p>
            {isManager(data.manager, user._id) && (
                <nav className="my-5 flex gap-3">
                    <button type="button" onClick={() => navigate('?newTask=true')} className="bg-purple-400 hover:bg-purlple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transtion-color">Agregar Tarea</button>
                    <Link to={'team'}
                        className="bg-fuchsia-400 hover:bg-fuchsia-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transtion-color">Colaboradores</Link>
                </nav>
            )}

            <TaskList
                tasks={data.tasks}
                canEdit={canEdit} />
            <AddTaskModal />
            <EditTaskData />
            <TaskModalDetails />
        </>
    )


}

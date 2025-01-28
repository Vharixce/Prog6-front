import {Link, Outlet} from "react-router-dom";

function Layout(){
    return(
        <div className=''>
            <header>
                <nav className="flex gap-4">
                    <Link to={'/'} className="font-bold">Home</Link>
                    <Link to={'/about'} className="font-bold">About</Link>
                    <Link to={'/exercises'} className="font-bold">exercises</Link>
                    <Link to={'/exercises/create'} className="font-bold">Create exercises</Link>

                </nav>
            </header>
            <main>
<Outlet/>
            </main>
            <footer>

            </footer>

        </div>
    )
}

export default Layout;
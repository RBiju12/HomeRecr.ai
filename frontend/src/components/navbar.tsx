import {Link} from 'react-router-dom'
import Home from '../pages/home'
import {Route, Routes} from 'react-router-dom'
import Dashboard from '../pages/dashboard'
import Search from '../pages/Search'


export function Links()
{
    return (
        <div className='flex flex-col space-y-6'>        
            <Link to="/">Home</Link>

            <Link to="/search">Search</Link>

            <Link to={`/dashboard/:${user?.email}`}>{user?.email.toUpperCase()} Dashboard</Link>
        </div>
    )
}


export default function Navbar()
{
    return (
    <>
        <Links />
        <div>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/search' element={<Search />} />
                <Route path={`/dashboard/:${user?.email}`} element={<Dashboard name={user?.email}/>} />
            </Routes>
        </div>
    </>

    )


}
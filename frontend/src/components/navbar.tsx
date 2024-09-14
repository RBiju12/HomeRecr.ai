import {Link} from 'react-router-dom'
import Home from '../pages/home'
import {Route, Routes} from 'react-router-dom'
import Dashboard from '../pages/dashboard'
import Search from '../pages/Search'


export default function Navbar({email}: any)
{
    return (
    <>
        <Link to="/">Home</Link>

        <Link to="/search">Search</Link>

        <Link to={`/dashboard/${email}`}>{email + ` Dashboard`}</Link>

        <div>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/search' element={<Search />} />
                <Route path={`/dashboard/${email}`} element={<Dashboard name={email}/>} />
            </Routes>
        </div>
    </>

    )
}
import RoutesConfig from "./RoutesConfig";
import {Routes, Route} from "react-router-dom"

function RoutesContainer(){
    return (<Routes>
        {RoutesConfig.map(function(RouteItem, id) {
            return <Route key={id} path={`/${RouteItem.path}`} element={<RouteItem.element/>}></Route>
        })}
    </Routes>)
}

export default RoutesContainer
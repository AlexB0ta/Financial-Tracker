import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faServer} from "@fortawesome/free-solid-svg-icons";

function Table1(props) {
    return (
        <div className="flex flex-col items-center">
            <div className="card-title font-bold">
                <p className="bg-blue-900 p-2 rounded-lg">Mothly data <FontAwesomeIcon icon={faServer}/></p>
            </div>
            <table className="table mt-5">
                {/* head */}
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Favorite Color</th>
                </tr>
                </thead>
                <tbody>
                {/* row 1 */}
                <tr>
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Blue</td>
                </tr>
                {/* row 2 */}
                <tr className="hover">
                    <th>2</th>
                    <td>Hart Hagerty</td>
                    <td>Desktop Support Technician</td>
                    <td>Purple</td>
                </tr>
                {/* row 3 */}
                <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                    <td>Red</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Table1;
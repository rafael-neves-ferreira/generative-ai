import React from 'react'

const RubricType1 = (props) => {
    return (
        < div className='flex justify-between' key={props.rubric.id} >
            <li className='list-disc'>{props.rubric.name}</li>
            <div className='flex space-x-4 justify-end'>
                <p>NB caracteres:</p>
                <input type="number" max={1500} onChange={(e) => { props.changeRubricDefaultValue(e.target.value, props.rubric.id) }} className='border w-2/12 text-center h-6' />
            </div>
        </div >
    )
}

const RubricType2 = (props) => {
    return (
        < div className='flex justify-between' key={props.rubric.id} >
            <li className='list-disc'>{props.rubric.name}</li>
            <div className='flex space-x-4 justify-end'>
                <p>NB caracteres:</p>
                <input type="number" max={1500} maxLength={100} onChange={(e) => { props.changeRubricDefaultValue(e.target.value, props.rubric.id) }} className='border w-2/12 text-center h-6' />
            </div>
        </div >
    )
}

const RubricType3 = ({ rubric }) => {
    return (
        < div className='flex flex-col space-y-10 justify-between' key={rubric.id} >
            <li className='list-disc'>{rubric.name}</li>
            <div className='justify-between w-2/5 flex ml-20 '>
                <p>Compact+</p>
                <p>Compact-</p>
            </div>
        </div >
    )
}

export default function RubricType(props) {
    switch (props.rubric.type) {
        case 1:
            return <RubricType1 changeRubricDefaultValue={props.changeRubricDefaultValue} rubric={props.rubric} />
        case 2:
            return <RubricType2 changeRubricDefaultValue={props.changeRubricDefaultValue} rubric={props.rubric} />
        case 3:
            return <RubricType3 rubric={props.rubric} />
        default:
            break;
    }
}

"use client"
import { useAppContext } from "@/components/AppContext";
import Button from "@/components/common/Button";
import { ActionType } from "@/reducers/AppReducer";
import { LuPanelLeft } from 'react-icons/lu';

export default function Menu() {
    const { state: { displayNavigation }, dispatch } = useAppContext()
    return (
        <Button
            icon={LuPanelLeft}
            variant="outline"
            className={`${displayNavigation ? 'hidden' : ''} fixed left-2 top-2`}
            onClick={() => {
                dispatch({ type: ActionType.UPDATE, fiel: 'displayNavigation', value: true })
            }}
        />)
}
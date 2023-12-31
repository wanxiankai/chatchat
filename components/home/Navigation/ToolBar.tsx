import { useAppContext } from "@/components/AppContext";
import Button from "@/components/common/Button";
import { MdLightMode, MdDarkMode, MdInfo } from 'react-icons/md';


export default function ToolBar() {
    const { setState, state: { themeMode } } = useAppContext()
    return (
        <div className="absolute bottom-0 left-0 right-0 bg-gray-800 flex p-2 justify-between">
            <Button
                icon={themeMode === 'light' ? MdLightMode : MdDarkMode}
                variant="text"
                onClick={() => {
                    setState((v) => {
                        return { ...v, themeMode: v.themeMode === 'dark' ? 'light' : 'dark' }
                    })
                }}
            />
            <Button
                icon={MdInfo}
                variant="text"
            />
        </div>)
}
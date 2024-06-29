

const Theme = () => {
    return (
        <div className="flex justify-center items-center my-6">
            <label className="flex cursor-pointer gap-2">
                <span className="label-text text-emerald-600">Light Theme</span>
                <input type="checkbox" value="synthwave" className="toggle theme-controller" />
                <span className="label-text text-emerald-600">Synthwave Theme</span>
            </label>
        </div>
    );
};

export default Theme;
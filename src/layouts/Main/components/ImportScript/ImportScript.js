import { useEffect } from 'react';
const ImportScript=resourceUrl => {
    useEffect(() => {
        const script=document.createElement('script');
        script.src=resourceUrl;
        script.async=false;
        document.body.appendChild(script);
        //      alert("dsds")
        return () => {
            document.body.removeChild(script);
        }
    }, [resourceUrl]);
};
export default ImportScript;
import { useEffect, useState } from "react";
import { OrderList } from "../components/OrderList";
import Loading from "../components/Loading";
const OrderMain = () =>  {

    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 500)

    }, [])
    return (
        <>
            {
                loading ? 
                    <Loading /> 
                : <OrderList />
            }
        </>
        
    )
}

export default OrderMain;
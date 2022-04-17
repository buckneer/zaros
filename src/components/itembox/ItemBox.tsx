import "./ItemBox.scss";



export default function ItemBox({title, icon, price}: {title: string, icon: string, price: string}) {
    return (
        <div className="ItemBox col-12 col-md-6 col-lg-3 store-item">
            <div className="block">
                <div className="title-wrapper">
                    <h5 className="title">
                        <span>{title}</span>
                    </h5>
                </div>
                <div className="main-body">
                    <div className="row">
                        <div className="col-12 align-content-center text-center">
                            <div className="image-holder">
                                <img src={icon}  alt="icon" />
                            </div>
                        </div>
                        <div className="col-12 align-content-center text-center">
                            <div>
                                    <span className="price text-warning">
                                        {price} tokens
                                    </span>
                                <br />

                                <a href="#" className="btn btn-danger">Add To Cart</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

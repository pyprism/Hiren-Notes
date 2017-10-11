import {Link} from "react-router-dom";

export default Sidebar = () => {
    return (
        <div className="overlay">
            <div className="search-bar">
                <div className="search-icon">
                    <i className="material-icons">search</i>
                </div>
                <input type="text" placeholder="search note by title" />
                <div className="close-search">
                    <i className="material-icons">close</i>
                </div>
            </div>

            <nav className="navbar">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="javascript:void(0);" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false"/>
                        <Link to="javascript:void(0);" className="bars"/>
                        <Link className="navbar-brand" to="/" >Hiren Notes</Link>
                    </div>
                    <div className="collapse navbar-collapse" id="navbar-collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <!-- Call Search -->
                            <li><Link href="javascript:void(0);" className="js-search" data-close="true"><i className="material-icons">search</i></Link></li>
                            <!-- #END# Call Search -->
                        </ul>
                    </div>
                </div>
            </nav>
            <section>
                <aside id="leftsidebar" className="sidebar">
                    <div className="menu">
                        <ul className="list">
                            <li className="active">
                                <Link to="/notes">
                                    <i className="material-icons">note</i>
                                    <span>Notes</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/create">
                                    <i className="material-icons">note_add</i>
                                    <span>Create Note</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <i className="material-icons">power_settings_new</i>
                                    <span>Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </aside>
            </section>
        </div>
    );
}
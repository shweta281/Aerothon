import './Header.css';
export default function Header(){
    return (
        <div>
            <header>
                <nav className="nav">
                    <h4 className="logo"></h4>
                    <ul className="navlist">
                        <li>Sign Up</li>
                        <li>Navigate</li>
                        <li>Privacy</li>
                        <li>Terms</li>
                    </ul>
                    <h4 className="but"></h4>
                </nav>
            </header>
        </div>
    )
}
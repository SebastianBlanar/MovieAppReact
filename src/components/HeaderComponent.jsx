import { Link } from "react-router-dom";
import { AccountComponent } from "./AccountComponent";

export function HeaderComponent() {
    return ( 
        <header className="py-3 px-10 flex items-center md:fixed top-0 w-full justify-between flex-wrap z-50 bg-custom-gradient">
            <div className="flex flex-grow basis-0">
                <a href="/">
                    <img src="/img/max-logo.webp" alt="Logo" />
                </a>
            </div>

            <nav className="order-3 md:order-2">
                <ul className="text-xs sm:text-sm [&>li>a]:inline-block [&>li>a]:px-2 md:[&>li>a]:px-4 [&>li>a]:font-medium [&>li>a]:py-2 text-white flex">
                    <li><a href="/">INICIO</a></li>
                    <li><Link to={"/series/"}>SERIES</Link></li>
                    <li><a href="">TENDENCIAS</a></li>
                    <li><Link to={"/movies/"}>PELICULAS</Link></li>
                </ul>
            </nav>

            <nav className="order-2 md:order-3 flex flex-grow justify-end basis-0">
                <ul className="flex text-sm [&>li>a]:inline-block [&>li>a]:px-4 [&>li>a]:font-medium [&>li>a]:py-2">
                    <li>
                        <Link to="/search/">
                            <img src="/img/lupa.webp" alt="Buscar" />
                        </Link>
                    </li>
                    <li>
                        <Link to={"/wishlist/"}>
                          <img src="/img/guardados.webp" alt="Guardados" />
                        </Link>
                    </li>
                    <li>
                        <AccountComponent />
                    </li>
                </ul>
            </nav>

        </header>
    );
}

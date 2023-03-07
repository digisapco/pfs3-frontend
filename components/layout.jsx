import Footer from '../components/footer';

const Layout = ({ children }) => {
    return (
        <html lang="es">
            <head />
            <body>
                {children}
                <Footer />
            </body>
        </html>
    )
}
export default Layout;
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const App = () => {
  
  return (
    <>
      <Toaster />
      <Navbar />
      <AppRoutes />
      <Footer />
    </>
  );
};

export default App;

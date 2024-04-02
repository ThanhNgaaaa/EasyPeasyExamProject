import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { publicRoutes } from "./routes/index";
import DefaultLayout from "./Layout/DefaultLayout/DefaultLayout";


function App() {
  return (
    <Box>
      {/* <Navbar /> */}
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          let Layout = DefaultLayout;
          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          } 
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Box>
  );
}
export default App;

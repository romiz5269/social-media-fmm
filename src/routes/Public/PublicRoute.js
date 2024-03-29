import Header from "../../Layout/components/Header";
import DefaultLayout from "../../Layout/default/DefaultLayout";

function PublicRoute({Component,hasLayout}) {
  return(

    <>
        {hasLayout ? (
            <DefaultLayout>
                <Component />
            </DefaultLayout>

        ) : (
            <Component />
        )}
    </>
  );
}

export {PublicRoute}

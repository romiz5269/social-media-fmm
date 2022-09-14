import DefaultLayout from "../../Layout/default/DefaultLayoutMainLayout";

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

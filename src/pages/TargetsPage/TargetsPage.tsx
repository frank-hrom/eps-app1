import React from "react";
import TargetsTable from "../../components/TargetsTable/TargetsTable";

const TargetsPage = (): JSX.Element => (
  <div className="TargetsPage" data-testid="TargetsPage">
    <TargetsTable />
  </div>
);

export default TargetsPage;

import DashboardCard from "@/components/util/DashboardCard";
import Equipment from "@/components/adminDashboard/equipment/Equipment";

import { getData } from "@/utils/getData";
import { useState, useEffect } from "react";

async function getEquipment() {
  const equipment = await getData("equipment");
  return equipment.data;
}

export default function EquipmentCard() {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    getEquipment().then((data) => {
      setEquipment(data);
    });
  }, []);

  return (
    <DashboardCard
      title="Equipment Manager"
      description="View and manage all equipment here."
      footer={<div></div>}
      maxW="950px"
    >
      <div className="flex flex-row justify-between max-w-2xl gap-8"> 
        <div className="flex flex-col items-center justify-around gap-4">
          <div className="grid items-center grid-cols-7 grid-rows-1 space-x-8 text-center">
            <p>Equipment ID</p>
            <p>Name</p>
            <p>Type</p>
            <p>Under Maintenance</p>
            <p>Last Maintained</p>
            <p>Set Maintenance</p>
          </div>
          {equipment && equipment.map((equipment, index) => (
          <Equipment equipment={equipment} key={index} />
          ))}
        </div>
      </div>
      <div>
        
      </div>
    </DashboardCard>
  );
}

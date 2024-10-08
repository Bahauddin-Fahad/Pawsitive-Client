"use client";

import { useGetAllUsers } from "@/src/hooks/user.hook";
import { IUser } from "@/src/types";
import { Chip } from "@nextui-org/chip";
import { User } from "@nextui-org/user";
import { useCallback, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Pagination } from "@nextui-org/pagination";
import SectionTitle from "@/src/app/(CommonLayout)/_components/SectionTitle";
import { FaCheckCircle } from "react-icons/fa";

const PaymentManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 9;
  const { data } = useGetAllUsers(
    `planType=PREMIUM&role=USER&page=${currentPage}&limit=${dataPerPage}`
  );

  const users = data?.data?.result ?? [];

  const totalPagesArray = Array.from(
    { length: data?.data?.meta?.totalPage || 0 },
    (_, i) => i + 1
  );

  const totalPages = totalPagesArray.length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns = [
    { name: "NAME", uid: "name" },
    { name: "EMAIL", uid: "email" },
    { name: "PLAN", uid: "userStatus" },
    { name: "START DATE", uid: "startDate" },
    { name: "END DATE", uid: "endDate" },
    { name: "CHARGE", uid: "charge" },
    { name: "PAYMENT STATUS", uid: "paymentStatus" },
  ];

  const renderCell = useCallback((singleUser: IUser, columnKey: React.Key) => {
    const cellValue = singleUser[columnKey as keyof IUser];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: singleUser.profilePhoto }}
            name={cellValue}
            className="font-bold text-xl"
          >
            <span className="text-lg">{singleUser.name}</span>
          </User>
        );
      case "email":
        return (
          <div className="flex flex-col">
            <p className="font-bold text-sm">{cellValue}</p>
          </div>
        );
      case "userStatus":
        return (
          <Chip
            className="capitalize"
            size="md"
            variant="solid"
            color="success"
          >
            <span className="font-bold">{singleUser?.planType}</span>
          </Chip>
        );
      case "startDate":
        return (
          <div className="flex flex-col">
            <p className="font-bold text-sm capitalize">
              {singleUser?.premiumStart}
            </p>
          </div>
        );
      case "endDate":
        return (
          <div className="flex flex-col">
            <p className="font-bold text-sm capitalize">
              {singleUser?.premiumEnd}
            </p>
          </div>
        );
      case "charge":
        return (
          <div className="flex flex-col">
            <p className="font-bold text-sm capitalize ml-2">
              $ {singleUser?.premiumCharge}
            </p>
          </div>
        );
      case "paymentStatus":
        return (
          <Chip
            className="capitalize"
            startContent={<FaCheckCircle size={18} />}
            size="md"
            variant="bordered"
            color="success"
          >
            <span className="font-bold">{singleUser?.paymentStatus}</span>
          </Chip>
        );

      default:
        return cellValue;
    }
  }, []);

  return (
    <div>
      <SectionTitle
        sub="Quick Insights & Management Tools"
        heading="Payment Management"
      />

      <div className="mt-10">
        {users.length > 0 ? (
          <Table aria-label="Users table with custom cells">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={users}>
              {(item: IUser) => (
                <TableRow key={item._id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        ) : (
          <Table aria-label="Example empty table">
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>ROLE</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ACTION</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
          </Table>
        )}
      </div>

      <div>
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8">
            <Pagination
              total={totalPages}
              initialPage={1}
              page={currentPage}
              onChange={handlePageChange}
              showControls
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentManagement;

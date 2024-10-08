"use client";

import { useGetAllUsers, useUpdateRole } from "@/src/hooks/user.hook";
import { useCallback, useState } from "react";
import { IUser } from "@/src/types";
import { useUser } from "@/src/context/user.provider";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";

import { User } from "@nextui-org/user";
import { Chip } from "@nextui-org/chip";
import { Pagination } from "@nextui-org/pagination";
import { Button } from "@nextui-org/button";
import toast from "react-hot-toast";
import SectionTitle from "@/src/app/(CommonLayout)/_components/SectionTitle";
import { DeleteUserModal } from "@/src/components/modals/DeleteUserModal";

const UsersManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [usertoDelete, setUsertoDelete] = useState<string | null>(null);
  const dataPerPage = 5;
  const { user } = useUser();
  const { mutate: handleUpdateRole } = useUpdateRole();

  const { data, refetch } = useGetAllUsers(
    `isDeleted=${false}&page=${currentPage}&limit=${dataPerPage}`
  );

  const users = data?.data?.result ?? []; // users Array

  const totalPagesArray = Array.from(
    { length: data?.data?.meta?.totalPage || 0 },
    (_, i) => i + 1
  );

  const totalPages = totalPagesArray.length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRemoveAdmin = async (id: string) => {
    toast.loading("Removing Admin...");

    const userData: Partial<IUser> = {
      role: "USER",
    };

    toast.dismiss();

    try {
      handleUpdateRole({ userData, id });
      toast.success("Admin Role removed successfully!");
      refetch();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleMakeAdmin = async (id: string) => {
    toast.loading("Promoting to Admin...");

    const userData: Partial<IUser> = {
      role: "ADMIN",
    };

    toast.dismiss();

    try {
      handleUpdateRole({ userData, id });
      toast.success("Promoted to Admin successfully!");
      refetch();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const columns = [
    { name: "NAME", uid: "name" },
    { name: "EMAIL", uid: "email" },
    { name: "ROLE", uid: "role" },
    { name: "PLANTYPE", uid: "planType" },
    { name: "ACTIONS", uid: "actions" },
  ];
  console.log(user);
  console.log(users);

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
      case "role":
        return (
          <div className="flex flex-col">
            <p className="font-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "planType":
        return (
          <Chip
            className="capitalize"
            size="sm"
            variant="solid"
            color={cellValue === "PREMIUM" ? "success" : "warning"}
          >
            <span className="font-bold">{cellValue}</span>
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            {singleUser?.email === user?.email ? (
              <button className="border border-success text-success py-1 px-3 rounded-lg cursor-pointer w-[125px]">
                Admin
              </button>
            ) : singleUser?.role === "ADMIN" &&
              singleUser?.email !== user?.email ? (
              <Button
                size="sm"
                onClick={() => handleRemoveAdmin(singleUser?._id)}
                className="bg-warning rounded-lg cursor-pointer text-white font-bold w-[125px]"
              >
                Remove Admin
              </Button>
            ) : (
              <>
                <Button
                  size="sm"
                  onClick={() => handleMakeAdmin(singleUser?._id)}
                  className="bg-success rounded-lg cursor-pointer text-white font-bold w-[125px]"
                >
                  Make Admin
                </Button>
                <label
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenDeleteModal(true);
                    setUsertoDelete(singleUser?._id);
                  }}
                  // onClick={() => {
                  //   handleDeleteUser(singleUser?._id);
                  // }}
                  className="btn btn-sm btn-error cursor-pointer"
                >
                  Delete
                </label>
              </>
            )}
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

  return (
    <div>
      <SectionTitle
        sub="Quick Insights & Management Tools"
        heading="All Users Management"
      />

      <div className="mt-10">
        {users.length > 0 ? (
          <Table aria-label="Users table with custom cells">
            <TableHeader columns={columns}>
              {(column: any) => (
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
                  {(columnKey: any) => (
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
              <TableColumn>PLANTYPE</TableColumn>
              <TableColumn>ACTION</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
          </Table>
        )}
      </div>

      <div>
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-4">
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
      {openDeleteModal && (
        <DeleteUserModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          usertoDelete={usertoDelete}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default UsersManagement;

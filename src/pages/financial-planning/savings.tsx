import dayjs from "dayjs";
import { useState } from "react";
import { useSelectContext } from "../../context/drop-down-context";

import { Header } from "../../components/header/header";
import { Input } from "../../components/ui/input";
import { DropDown } from "../../components/ui/drop-down";
import { Button } from "../../components/ui/button";
import { IconButton } from "../../components/ui/icon-button";

import { Table } from "../../components/ui/table/table";
import { TableHeader } from "../../components/ui/table/table-header";
import { TableRow } from "../../components/ui/table/table-row";
import { TableCell } from "../../components/ui/table/table-cell";
import { StatusSpan } from "../../components/ui/table/status";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";

interface Transaction {
  description: string;
  amount: number;
  status: string;
  date: string;
}

export function Savings() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string | number>("");
  const [date, setDate] = useState<string>("");
  const { select, setSelect } = useSelectContext();
  const [infoDesc, setInfoDesc] = useState<string>("");
  const [infoAmount, setInfoAmount] = useState<string>("");
  const [infoSelect, setInfoSelect] = useState<string>("");
  const [infoDate, setInfoDate] = useState<string>("");

  const handleInsert = () => {
    if (!description) {
      setInfoDesc("Please enter a description");
      return;
    } else {
      setInfoDesc("");
    }
    if (typeof amount !== "number" || amount <= 0 || isNaN(amount)) {
      setInfoAmount("Please enter a valid amount greater than 0");
      return;
    } else {
      setInfoAmount("");
    }
    if (!select) {
      setInfoSelect("Please select a status");
      return;
    } else {
      setInfoSelect("");
    }
    if (!date) {
      setInfoDate("Please select a date");
      return;
    } else {
      setInfoDate("");
    }

    const newTransaction: Transaction = {
      description,
      amount,
      status: select,
      date,
    };

    setTransactions([...transactions, newTransaction]);
    setDescription("");
    setAmount("");
    setDate("");
    setSelect("");
    setInfoDesc("");
    setInfoAmount("");
    setInfoSelect("");
    setInfoDate("");
  };

  return (
    <div className="flex flex-col gap-5">
      <Header />
      <div className="flex flex-wrap items-center px-5 gap-5 justify-center sm:justify-between mt-24">
        <h2 className="roboto-medium text-xl">Revenue</h2>
      </div>
      <div className="flex flex-col flex-wrap justify-center items-center sm:flex-row">
        <div className="flex flex-col p-2 gap-2">
          <label id="description">
            Description{" "}
            <span className="text-xs text-slate-400 ">(max 50 characters)</span>
          </label>
          <Input
            empty={!!infoDesc}
            type="text"
            id="description"
            placeholder="Description"
            maxLength={50}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col p-2 gap-2">
          <label id="amount">Value</label>
          <Input
            empty={!!infoAmount}
            type="number"
            id="amount"
            placeholder="Amount"
            value={amount.toString()}
            onChange={(e) => {
              const newAmount = parseFloat(e.target.value);
              setAmount(isNaN(newAmount) ? "" : newAmount);
            }}
          />
        </div>
        <div className="flex flex-col p-2 gap-2">
          <label id="status">Status</label>
          <DropDown empty={!!infoSelect} />
        </div>
        <div className="flex flex-col p-2 gap-2">
          <label id="date">Date</label>
          <Input
            empty={!!infoDate}
            type="date"
            id="date"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>
      <p className="text-md text-center drop-shadow-lg">
        {infoDesc}
        {infoAmount}
        {infoSelect}
        {infoDate}
      </p>
      <Button
        className="z-0"
        onClick={handleInsert}
        disable={!!infoDesc || !!infoAmount || !!infoSelect || !!infoDate}
      >
        Insert
      </Button>
      <Table>
        <thead>
          <tr className="hidden sm:table-row border-b border-slate-400/10">
            <TableHeader>Transaction</TableHeader>
            <TableHeader>Amount</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </tr>
        </thead>
        {transactions.map((transaction, index) => (
          <TransactionRow key={index} transaction={transaction} />
        ))}
        <tfoot>
          <tr className="flex flex-col sm:table-row">
            <TableCell colSpan={2} className="text-center">
              <span>Showing {transactions.length} transactions</span>
            </TableCell>
            <TableCell className="text-center">
              <span>Page X of Y</span>
            </TableCell>
            <TableCell colSpan={2}>
              <div className="flex justify-center gap-1.5">
                <IconButton>
                  <ChevronsLeft className="size-4" />
                </IconButton>
                <IconButton>
                  <ChevronLeft className="size-4" />
                </IconButton>
                <IconButton>
                  <ChevronRight className="size-4" />
                </IconButton>
                <IconButton>
                  <ChevronsRight className="size-4" />
                </IconButton>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}

function TransactionRow({ transaction }: { transaction: Transaction }) {
  type Status = "Paid" | "Pending" | "Cancelled" | "Overdue" | "";
  const statusColorMap: { [key in Status]: string } = {
    Paid: "bg-green-500",
    Pending: "bg-blue-500",
    Cancelled: "bg-yellow-500",
    Overdue: "bg-red-500",
    "": "bg-gray-500", // Default color if no status is selected
  };
  const transactionStatus = transaction.status as Status;
  return (
    <tbody>
      <TableRow className="flex flex-col p-2 sm:hidden">
        <div className="flex justify-between">
          <TableHeader>Transaction</TableHeader>
          <TableCell>{transaction.description}</TableCell>
        </div>
        <div className="flex justify-center">
          <hr className="w-60 p-1 border-white/10" />
        </div>
        <div className="flex justify-between">
          <TableHeader>Amount</TableHeader>
          <TableCell>$ {transaction.amount.toFixed(2)}</TableCell>
        </div>
        <div className="flex justify-center">
          <hr className="w-60 p-1 border-white/10" />
        </div>
        <div className="flex justify-between">
          <TableHeader>Status</TableHeader>
          <TableCell>
            <StatusSpan className={statusColorMap[transactionStatus]}>
              {transaction.status}
            </StatusSpan>
          </TableCell>
        </div>
        <div className="flex justify-center">
          <hr className="w-60 p-1 border-white/10" />
        </div>
        <div className="flex justify-between">
          <TableHeader>Date</TableHeader>
          <TableCell>{dayjs(transaction.date).format("MM/DD/YYYY")}</TableCell>
        </div>
        <div className="flex justify-center">
          <hr className="w-60 p-1 border-white/10" />
        </div>
        <TableCell className="flex items-center">
          <IconButton>
            <MoreHorizontal className="size-4" />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow className="hidden sm:table-row">
        <TableCell>{transaction.description}</TableCell>
        <TableCell>$ {transaction.amount.toFixed(2)}</TableCell>
        <TableCell>
          <StatusSpan className={statusColorMap[transactionStatus]}>
            {transaction.status}
          </StatusSpan>
        </TableCell>
        <TableCell>{dayjs(transaction.date).format("MM/DD/YYYY")}</TableCell>
        <TableCell>
          <IconButton>
            <MoreHorizontal className="size-4" />
          </IconButton>
        </TableCell>
      </TableRow>
    </tbody>
  );
}

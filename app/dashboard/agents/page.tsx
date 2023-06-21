'use client' 

import { FC, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useAgent } from '../../contexts';
import EditAgentForm from "./EditAgentForm";

const AgentsPage: FC = () => {
  const { agents } = useAgent();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div>
      <h1 className="font-bold mb-6">Agents</h1>
      <div className="text-right mb-4">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create Agent</Button>
          </DialogTrigger>
          <EditAgentForm isUpdate={false} onCloseDialog={() => setIsCreateDialogOpen(false)} />
        </Dialog>
      </div>
      <Table>
        <TableCaption>A list of your agents.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Agent Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agents.map((agent) => (
            <TableRow key={agent.agentName}>
              <TableCell>{agent.agentName}</TableCell>
              <TableCell>{agent.agentStatus}</TableCell>
              <TableCell>
                <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
                  <DialogTrigger>
                    <button className="text-blue-500" onClick={() => setEditingId(agent.id)}>Edit</button>
                  </DialogTrigger>
                  {editingId === agent.id && (
                    <EditAgentForm isUpdate={true} onCloseDialog={() => setIsUpdateDialogOpen(false)} defaultValues={agent} />
                  )}
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AgentsPage;

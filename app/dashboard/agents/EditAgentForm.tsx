'use client'

import { FC } from "react";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useAgent, Agent } from "@/app/contexts";
 
const formSchema = z.object({
  agentName: z.string().min(2).max(50),
  agentStatus: z.string(),
});

type AgentFormProps = {
  isUpdate: boolean;
  onCloseDialog: () => void;
  defaultValues?: Agent,
};

const EditAgentForm: FC<AgentFormProps> = ({ onCloseDialog, defaultValues, isUpdate }) => {
  const { addAgent, updateAgent } = useAgent();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    if (isUpdate) {
      if (!defaultValues) return;
      updateAgent({  ...values, id: defaultValues?.id });
    } else {
      addAgent({
        agentName: values.agentName,
        agentStatus: values.agentStatus,
      });
    }
    onCloseDialog();
  }

  return (
    <DialogContent>
      <DialogHeader>
        <h3>{isUpdate ? "Update Agent" : "Create Agent"}</h3>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="agentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Agent name" {...field} value={field.value || ""} />
                </FormControl>
                <FormDescription>This is the agent&#039;s name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agentStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Agent Status</SelectLabel>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>This is the agent&#039;s status</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </DialogContent>
  );
};

export default EditAgentForm;

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteConfirmationDialouge = ({ children, deleteProduct }) => {
  return (
    <div>
      {/* Dialog */}
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription asChild>
              <div>
                <h2> Do you really want to delete this product?</h2>
                <div className="flex justify-end gap-2">
                  <Button>Close</Button>
                  <Button variant="destructive" onClick={deleteProduct}>
                    Delete
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteConfirmationDialouge;

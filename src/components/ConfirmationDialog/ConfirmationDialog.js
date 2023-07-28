import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const ConfirmationDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>确认操作</DialogTitle>
      <DialogContent>
        确定要执行这个操作吗？
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          取消
        </Button>
        <Button onClick={onConfirm} color="primary">
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;

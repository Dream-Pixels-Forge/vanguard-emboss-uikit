import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as UI from './index'
import { describe, it, expect } from 'vitest'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from './alert-dialog'

describe('AlertDialog', () => {
  it('renders trigger', () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger>Delete account</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogAction>Confirm</AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    )
    expect(screen.getByText('Delete account')).toBeInTheDocument()
  })

  it('opens content on click', async () => {
    const user = userEvent.setup()
    render(
      <AlertDialog>
        <AlertDialogTrigger>Delete account</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogAction>Confirm</AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    )
    expect(screen.queryByText('Confirm')).not.toBeInTheDocument()
    await user.click(screen.getByText('Delete account'))
    expect(screen.getByText('Confirm')).toBeInTheDocument()
  })

  it('exports from index', () => {
    expect(UI.AlertDialog).toBeDefined()
    expect(UI.AlertDialogTrigger).toBeDefined()
    expect(UI.AlertDialogContent).toBeDefined()
    expect(UI.AlertDialogAction).toBeDefined()
    expect(UI.AlertDialogCancel).toBeDefined()
  })
})

import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import { CButton } from '@coreui/react'
import ComponentRBAC from 'src/utils/ComponentRBAC'
import PropTypes from 'prop-types'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import BondsForm from './BondsForm'

export default function BondsTable(props) {
  const [modal, setModal] = React.useState(false)
  const [editBond, setEditBond] = React.useState('')

  const toggle = () => setModal(!modal)
  const renderDetailsButton = (params) => {
    return (
      <ComponentRBAC allowedRoles={['admin']}>
        <strong>
          <CButton
            variant="outline"
            color="primary"
            size="sm"
            onClick={() => {
              setEditBond(params.row)
              toggle()
            }}
          >
            Edit
          </CButton>
        </strong>
      </ComponentRBAC>
    )
  }

  const columns = [
    { field: 'issue', headerName: 'Issue', flex: 1, minWidth: 130 },
    { field: 'issuer', headerName: 'Issuer', flex: 1.5, minWidth: 200 },
    { field: 'type', headerName: 'Type', flex: 1, minWidth: 130 },
    { field: 'value_date', headerName: 'Value Date', flex: 1, minWidth: 130 },
    { field: 'redemption_date', headerName: 'Redemption Date', flex: 1, minWidth: 130 },
    { field: 'amount', headerName: 'Amount', flex: 1, minWidth: 130 },
    { field: 'coupon_rate', headerName: 'Coupon Rate', flex: 1, minWidth: 100 },
    { field: 'tax_rate', headerName: 'Tax Rate', flex: 1, minWidth: 70 },
    { field: 'tenor', headerName: 'Tenor', flex: 1, minWidth: 70 },
    { field: 'maturity', headerName: 'Time to Maturity', flex: 1, minWidth: 100 },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      renderCell: renderDetailsButton,
    },
  ]

  const bonds = Array.from(props.bonds)

  let rows = []

  bonds.forEach(function (bond) {
    rows.push({
      id: bond.uid,
      issue: bond.issue,
      issuer: bond.issuer,
      type: bond.type,
      price_quote: bond.price_quote,
      value_date: bond.value_date,
      initial_coupon_payment_date: bond.initial_coupon_payment_date,
      redemption_date: bond.redemption_date,
      amount: bond.amount,
      dirty_price: bond.dirty_price,
      coupon_rate: bond.coupon_rate,
      tax_rate: bond.tax_rate,
      tenor: bond.tenor,
      maturity: bond.maturity,
      coupon_payment_dates: bond.coupon_payment_dates,
    })
  })

  return (
    <>
      <div>
        <Modal backdrop={'static'} isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>New Bond</ModalHeader>
          <ModalBody>
            <BondsForm onSave={props.onSave} toggle={toggle} {...editBond}></BondsForm>
          </ModalBody>
        </Modal>
      </div>
      <DataGrid
        sx={{ border: 0 }}
        css={styled}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        rowsPerPageOptions={[5]}
        autoHeight={true}
        pageSizeOptions={[5, 10, 25, 100]}
        pagination
      />
    </>
  )
}

BondsTable.propTypes = {
  bonds: PropTypes.any,
  onSave: PropTypes.func,
}

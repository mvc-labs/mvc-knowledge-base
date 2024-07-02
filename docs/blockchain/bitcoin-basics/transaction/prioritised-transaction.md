---
sidebar_position: 9
---

# Prioritised Transaction(RBF CPFP)

An introduction to improving the priority of transactions.

## How to Increase Transaction Priority

The priority of a Bitcoin transaction determines how quickly it gets confirmed in the network. Here are several methods
to increase transaction priority:

### 1. Increase Transaction Fees

The most straightforward method is to pay higher transaction fees. Miners prioritize transactions with higher fee
rates (satoshis per byte).

### 2. Use the Replace-by-Fee (RBF) Mechanism

The RBF mechanism allows users to replace an existing transaction with a new one that has a higher fee, thus increasing
the priority of the new transaction.

### 3. Use the Child-Pays-For-Parent (CPFP) Mechanism

The CPFP mechanism allows users to create a new transaction using the output of an unconfirmed transaction as input and
set a high fee to encourage miners to confirm both the original and new transactions together.

## Detailed Explanation of the RBF Mechanism

### What is the RBF Mechanism?

RBF (Replace-by-Fee) allows users to replace an already broadcast but unconfirmed transaction with a new one that has a
higher fee.

### Advantages

- **Flexibility**: Users can adjust the fee to adapt to network congestion.
- **Faster Confirmation**: By increasing the fee, it enhances the likelihood of miners prioritizing the transaction.

### Disadvantages

- **Merchants May Not Accept**: Some merchants might not accept RBF transactions due to the risk of replacement before
  confirmation.
- **Complexity**: Wallet software needs to support RBF, and users need to understand how to use it.

## Detailed Explanation of the CPFP Mechanism

### What is the CPFP Mechanism?

CPFP (Child-Pays-For-Parent) allows users to create a new transaction using the output of an unconfirmed transaction,
and by paying a high fee, it promotes the confirmation of both the original and the new transactions together.

### Advantages

- **Double Confirmation**: Both the parent and child transactions are confirmed simultaneously, speeding up the overall
  confirmation process.
- **Merchant-Friendly**: Merchants are more likely to accept CPFP transactions as the payer can actively increase the
  transaction priority.

### Disadvantages

- **Additional Costs**: Extra fees are required to speed up transaction confirmation.
- **Complexity**: Users need to understand how to create a child transaction and set appropriate fee rates.

## Comparison of Advantages and Disadvantages

| Mechanism | Advantages                             | Disadvantages                                                          |
|-----------|----------------------------------------|------------------------------------------------------------------------|
| RBF       | High flexibility; faster confirmation  | Some merchants may not accept; requires wallet support; complex to use |
| CPFP      | Double confirmation; merchant-friendly | Additional fees; complex to use                                        |

## Summary

The main methods to increase Bitcoin transaction priority are to pay higher fees and use RBF and CPFP mechanisms. RBF
provides flexibility but may not be accepted by some merchants, while CPFP, though more costly, is more
merchant-friendly. Understanding these mechanisms and their pros and cons helps users choose the appropriate method to
accelerate transaction confirmation based on specific situations.

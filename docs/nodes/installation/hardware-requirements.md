---
sidebar_position: 4
---

# Hardware Requirements

# Recommended Hardware Configuration

Hardware configuration list.

To ensure the normal operation of MVC nodes, based on different usage scenarios and purposes, we recommend the following
hardware configurations:

|                | Development Node              | Index Node                                                                                 | Mining Node                                                        |
|----------------|-------------------------------|--------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| Usage Scenario | For development and debugging | Reading and parsing on-chain data for APP use, providing RPC interface functionality, etc. | Validating transactions, packaging transactions, mining new blocks |
| CPU            | 2 cores                       | 4 cores                                                                                    | 8 cores                                                            |
| Memory         | 4GB                           | 16GB                                                                                       | 32GB                                                               |
| Storage        | 50GB SSD                      | 500GB+ SSD                                                                                 | 200GB SSD                                                          |
| Pruning Mode   | Enabled                       | Disabled (indexes all data)                                                                | Enabled                                                            |
| Bandwidth      | 10Mbps                        | 100Mbps                                                                                    | 1000Mbps                                                           |

Based on the current data volume and real-time transaction volume of the MVC network, the hardware configurations
recommended are as shown in the table above. These configurations will be continually updated and expanded as the MVC
network evolves, so please stay updated with the hardware configuration changes.

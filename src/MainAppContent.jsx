import {
  ActionIcon,
  Alert,
  Badge,
  Button,
  Checkbox,
  Grid,
  Group,
  Loader,
  NativeSelect,
  Overlay,
  Paper,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Table,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconAlertCircle,
  IconCheck,
  IconClockHour4,
  IconCloudUpload,
  IconDownload,
  IconFolder,
  IconPlus,
  IconRefresh,
  IconTrash,
} from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import iim from "./logo/png/logo-no-background.png";
import "./main-app-content.css";

const api_server = process.env.REACT_APP_API_SERVER;

const MainAppContent = (props) => {
  const accessToken = props.accessToken;
  const [refreshing, setRefreshing] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [busyAction, setBusyAction] = useState("");
  const [backedUpFolders, setBackedUpFolders] = useState([]);
  const [requestedFolders, setRequestedFolders] = useState([]);
  const [activeView, setActiveView] = useState("backed-up");
  const [reloadKey, setReloadKey] = useState(0);
  const [statusMessage, setStatusMessage] = useState(null);

  const form = useForm({
    initialValues: {
      folderName: "",
      scheduling_type: "0",
      termsOfService: false,
    },
  });

  const activeRows =
    activeView === "backed-up" ? backedUpFolders : requestedFolders;

  const setErrorMessage = (message) => {
    setStatusMessage({ type: "error", message });
  };

  const setSuccessMessage = (message) => {
    setStatusMessage({ type: "success", message });
  };

  useEffect(() => {
    const fetchFolders = async () => {
      setRefreshing(true);

      try {
        const response = await axios.post(`${api_server}/getfolderlist`, {
          access_token: accessToken,
        });

        const backupFolders = Array.isArray(response.data?.backup_folders)
          ? response.data.backup_folders
          : [];
        const requestFolders = Array.isArray(response.data?.request_folders)
          ? response.data.request_folders
          : [];

        setBackedUpFolders(backupFolders);
        setRequestedFolders(requestFolders);
      } catch (error) {
        console.error(error);
        setBackedUpFolders([]);
        setRequestedFolders([]);
        setErrorMessage("Unable to load your backup folders right now.");
      } finally {
        setRefreshing(false);
      }
    };

    fetchFolders();
  }, [accessToken, reloadKey]);

  const refreshFolders = () => {
    setReloadKey((current) => current + 1);
  };

  const handleSubmit = async () => {
    const data = form.values;

    if (!data.folderName.trim()) {
      setErrorMessage("Enter a folder name before creating a backup.");
      return;
    }

    if (!data.termsOfService) {
      setErrorMessage("Agree to the terms and conditions before submitting.");
      return;
    }

    setSubmitting(true);
    setStatusMessage(null);

    try {
      const response = await axios.post(`${api_server}/addfolder`, {
        folder_name: data.folderName.trim(),
        scheduling_type: data.scheduling_type,
        access_token: accessToken,
      });

      setSuccessMessage(response.data?.Data || "Backup request submitted.");
      form.reset();
      refreshFolders();
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to create the backup request right now.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownloadButton = async (folderName) => {
    setBusyAction(`download:${folderName}`);
    setStatusMessage(null);

    try {
      const response = await axios.post(
        `${api_server}/downloadfolder`,
        {
          folder_name: folderName,
          access_token: accessToken,
        },
        {
          responseType: "blob",
        },
      );

      const downloadUrl = window.URL.createObjectURL(response.data);
      const anchor = document.createElement("a");
      anchor.href = downloadUrl;
      anchor.download = `${folderName}.zip`;
      anchor.click();
      window.URL.revokeObjectURL(downloadUrl);
      setSuccessMessage(`Started download for ${folderName}.`);
    } catch (error) {
      console.error(error);
      setErrorMessage(`Unable to download ${folderName} right now.`);
    } finally {
      setBusyAction("");
    }
  };

  const handleDeleteButton = async (folderName, mode) => {
    setBusyAction(`${mode}:${folderName}`);
    setStatusMessage(null);

    try {
      await axios.post(
        mode === "backed-up"
          ? `${api_server}/deletefolder`
          : `${api_server}/deleterequest`,
        {
          folder_name: folderName,
          access_token: accessToken,
        },
      );

      setSuccessMessage(
        mode === "backed-up"
          ? `${folderName} was removed from backed up folders.`
          : `${folderName} was removed from requested backups.`,
      );
      refreshFolders();
    } catch (error) {
      console.error(error);
      setErrorMessage(`Unable to delete ${folderName} right now.`);
    } finally {
      setBusyAction("");
    }
  };

  const renderDesktopRows = () =>
    activeRows.map((element) => {
      const folderName = element[2];
      const timestamp = element[3];
      const isBusy = busyAction.includes(folderName);

      return (
        <tr key={`${folderName}-${timestamp}-${activeView}`}>
          <td>
            <div className="backup-dashboard__cell-main">
              <Text weight={600}>{folderName}</Text>
              <Text size="sm" color="dimmed">
                {activeView === "backed-up"
                  ? "Snapshot stored in dBackUp cloud"
                  : "Waiting for the next sync check"}
              </Text>
            </div>
          </td>
          <td>
            <Text size="sm" className="backup-dashboard__time">
              {timestamp}
            </Text>
          </td>
          <td>
            <Badge
              color={activeView === "backed-up" ? "teal" : "blue"}
              variant="light"
              radius="xl"
            >
              {activeView === "backed-up" ? "Ready" : "Requested"}
            </Badge>
          </td>
          <td>
            <div className="backup-dashboard__actions">
              {activeView === "backed-up" && (
                <ActionIcon
                  variant="light"
                  color="blue"
                  size="lg"
                  radius="xl"
                  title={`Download ${folderName}`}
                  aria-label={`Download ${folderName}`}
                  disabled={isBusy}
                  onClick={() => handleDownloadButton(folderName)}
                >
                  <IconDownload size={18} />
                </ActionIcon>
              )}
              <ActionIcon
                variant="light"
                color="red"
                size="lg"
                radius="xl"
                title={`Delete ${folderName}`}
                aria-label={`Delete ${folderName}`}
                disabled={isBusy}
                onClick={() => handleDeleteButton(folderName, activeView)}
              >
                <IconTrash size={18} />
              </ActionIcon>
            </div>
          </td>
        </tr>
      );
    });

  const renderMobileCards = () =>
    activeRows.map((element) => {
      const folderName = element[2];
      const timestamp = element[3];
      const isBusy = busyAction.includes(folderName);

      return (
        <Paper
          key={`${folderName}-${timestamp}-${activeView}-mobile`}
          withBorder
          radius="xl"
          className="backup-dashboard__mobile-card"
        >
          <Group position="apart" align="flex-start" noWrap>
            <div>
              <Text weight={600}>{folderName}</Text>
              <Text size="sm" color="dimmed" mt={4}>
                {activeView === "backed-up" ? "Backup time" : "Last checked"}
              </Text>
              <Text size="sm" className="backup-dashboard__time">
                {timestamp}
              </Text>
            </div>

            <Badge
              color={activeView === "backed-up" ? "teal" : "blue"}
              variant="light"
              radius="xl"
            >
              {activeView === "backed-up" ? "Ready" : "Requested"}
            </Badge>
          </Group>

          <div className="backup-dashboard__mobile-actions">
            {activeView === "backed-up" && (
              <Button
                variant="light"
                color="blue"
                radius="xl"
                leftIcon={<IconDownload size={16} />}
                disabled={isBusy}
                onClick={() => handleDownloadButton(folderName)}
              >
                Download
              </Button>
            )}
            <Button
              variant="light"
              color="red"
              radius="xl"
              leftIcon={<IconTrash size={16} />}
              disabled={isBusy}
              onClick={() => handleDeleteButton(folderName, activeView)}
            >
              Delete
            </Button>
          </div>
        </Paper>
      );
    });

  const renderEmptyState = () => (
    <div className="backup-dashboard__empty">
      <ThemeIcon size={52} radius="xl" color="teal" variant="light">
        <IconFolder size={26} />
      </ThemeIcon>
      <Title order={4}>
        {activeView === "backed-up"
          ? "No completed backups yet"
          : "No pending requests"}
      </Title>
      <Text color="dimmed" align="center">
        {activeView === "backed-up"
          ? "Create your first backup from the panel on the right and it will appear here."
          : "Any scheduled or waiting backup requests will appear here."}
      </Text>
    </div>
  );

  return (
    <section className="backup-dashboard">
      <div className="backup-dashboard__shell">
        <div className="backup-dashboard__hero">
          <div>
            <Text className="backup-dashboard__eyebrow">Backup dashboard</Text>
            <Title order={2} className="backup-dashboard__title">
              Manage scheduled Google Drive backups without the clutter
            </Title>
            <Text className="backup-dashboard__subtitle">
              Review completed snapshots, track pending jobs, and create a new
              backup request from one place.
            </Text>
          </div>

          <Button
            variant="default"
            radius="xl"
            className="backup-dashboard__refresh"
            leftIcon={<IconRefresh size={16} />}
            onClick={refreshFolders}
          >
            Refresh list
          </Button>
        </div>

        {statusMessage && (
          <Alert
            radius="xl"
            variant="light"
            color={statusMessage.type === "success" ? "teal" : "red"}
            icon={
              statusMessage.type === "success" ? (
                <IconCheck size={16} />
              ) : (
                <IconAlertCircle size={16} />
              )
            }
          >
            {statusMessage.message}
          </Alert>
        )}

        <SimpleGrid
          cols={3}
          spacing="lg"
          breakpoints={[
            { maxWidth: "62rem", cols: 1 },
          ]}
        >
          <Paper withBorder radius="xl" p="lg" className="backup-dashboard__stat">
            <Group position="apart" align="flex-start" noWrap>
              <div>
                <Text className="backup-dashboard__stat-label">
                  Backed up folders
                </Text>
                <Text className="backup-dashboard__stat-value">
                  {backedUpFolders.length}
                </Text>
              </div>
              <ThemeIcon size={42} radius="xl" color="teal" variant="light">
                <IconCloudUpload size={20} />
              </ThemeIcon>
            </Group>
          </Paper>

          <Paper withBorder radius="xl" p="lg" className="backup-dashboard__stat">
            <Group position="apart" align="flex-start" noWrap>
              <div>
                <Text className="backup-dashboard__stat-label">
                  Requested backups
                </Text>
                <Text className="backup-dashboard__stat-value">
                  {requestedFolders.length}
                </Text>
              </div>
              <ThemeIcon size={42} radius="xl" color="blue" variant="light">
                <IconClockHour4 size={20} />
              </ThemeIcon>
            </Group>
          </Paper>

          <Paper withBorder radius="xl" p="lg" className="backup-dashboard__stat">
            <Group position="apart" align="flex-start" noWrap>
              <div>
                <Text className="backup-dashboard__stat-label">
                  Active section
                </Text>
                <Text className="backup-dashboard__stat-value backup-dashboard__stat-value--small">
                  {activeView === "backed-up"
                    ? "Completed backups"
                    : "Pending requests"}
                </Text>
              </div>
              <ThemeIcon size={42} radius="xl" color="grape" variant="light">
                <IconFolder size={20} />
              </ThemeIcon>
            </Group>
          </Paper>
        </SimpleGrid>

        <Grid gutter="xl" align="start" className="backup-dashboard__grid">
          <Grid.Col lg={8} xl={8}>
            <Paper withBorder radius="xl" p="xl" className="backup-dashboard__panel">
              <div className="backup-dashboard__panel-head">
                <div>
                  <Text className="backup-dashboard__eyebrow">
                    Scheduled backup list
                  </Text>
                  <Title order={3}>Folder history</Title>
                  <Text color="dimmed" mt={6}>
                    Switch between completed backups and pending requests.
                  </Text>
                </div>
              </div>

              <SegmentedControl
                radius="xl"
                fullWidth
                className="backup-dashboard__switcher"
                value={activeView}
                onChange={setActiveView}
                data={[
                  {
                    value: "backed-up",
                    label: `Backed Up (${backedUpFolders.length})`,
                  },
                  {
                    value: "requested",
                    label: `Requested (${requestedFolders.length})`,
                  },
                ]}
              />

              {refreshing && activeRows.length === 0 ? (
                <div className="backup-dashboard__loading">
                  <Loader size="md" />
                  <Text color="dimmed">Loading your folders...</Text>
                </div>
              ) : activeRows.length === 0 ? (
                renderEmptyState()
              ) : (
                <>
                  <div className="backup-dashboard__table-desktop">
                    <Table
                      horizontalSpacing="lg"
                      verticalSpacing="md"
                      highlightOnHover
                    >
                      <thead>
                        <tr>
                          <th>Folder</th>
                          <th>
                            {activeView === "backed-up"
                              ? "Backup time"
                              : "Last checked"}
                          </th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>{renderDesktopRows()}</tbody>
                    </Table>
                  </div>

                  <div className="backup-dashboard__mobile-list">
                    <Stack spacing="md">{renderMobileCards()}</Stack>
                  </div>
                </>
              )}
            </Paper>
          </Grid.Col>

          <Grid.Col lg={4} xl={4}>
            <Paper withBorder radius="xl" p="xl" className="backup-dashboard__form-card">
              <img
                src={iim}
                alt="dBackUp logo"
                className="backup-dashboard__form-logo"
              />

              <Text className="backup-dashboard__eyebrow">New backup</Text>
              <Title order={3}>Add a folder to dBackUp</Title>
              <Text color="dimmed" mt={8} mb="lg">
                Create a one-time snapshot now or keep watching for the folder
                so the backup starts as soon as it becomes available.
              </Text>

              <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack spacing="md">
                  <TextInput
                    placeholder="Enter folder name"
                    label="Folder name"
                    radius="md"
                    size="md"
                    withAsterisk
                    {...form.getInputProps("folderName")}
                  />

                  <NativeSelect
                    label="Backup type"
                    radius="md"
                    size="md"
                    data={[
                      { value: "0", label: "Backup now" },
                      {
                        value: "1",
                        label: "Backup whenever the folder becomes available",
                      },
                    ]}
                    rightSection={<IconRefresh size={14} />}
                    {...form.getInputProps("scheduling_type")}
                  />

                  <Checkbox
                    label="I agree to the terms and conditions"
                    {...form.getInputProps("termsOfService", {
                      type: "checkbox",
                    })}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    size="md"
                    radius="xl"
                    color="teal"
                    loading={submitting}
                    leftIcon={<IconPlus size={16} />}
                  >
                    Create backup request
                  </Button>
                </Stack>
              </form>
            </Paper>
          </Grid.Col>
        </Grid>
      </div>

      {submitting && (
        <Overlay zIndex={1000} opacity={0.7} color="#f4fbf7">
          <div className="backup-dashboard__overlay">
            <Loader size="md" />
            <Title order={4}>Creating your backup request</Title>
            <Text color="dimmed">This usually takes a few seconds.</Text>
          </div>
        </Overlay>
      )}
    </section>
  );
};

export default MainAppContent;

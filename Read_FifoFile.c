/* ======================================================================================= */
/*                                                                                         */
/*                               Thread Bluetooth Socket                                   */
/*                                                                                         */
/* ======================================================================================= */
void* BlueSocketThread(void *arg) {
	int fd, readlenbuf, valorebuf;
	char * myfifo = "/tmp/msgfifoSone";
	char buf[MAX_BLUEBUF], Xvalbuf[2];

	pthread_t id = pthread_self();
	/*printf("---- id %u\n", id);*/

	/* create the FIFO (named pipe) */
	mkfifo(myfifo, 0666);

	/* open, read, and display the message from the FIFO */
	fd = open(myfifo, O_RDONLY);

	/*printf("BLE Thread Ready...\n");*/

	while ( 1 ) {
		//memset(buf, 0, MAX_BLUEBUF);

		readlenbuf = read(fd, buf, MAX_BLUEBUF);
		buf[readlenbuf]=0;

		strncpy(initmesg, buf, 3);
		strncpy(Xvalbuf, buf+3, 3);
		sscanf(Xvalbuf, "%x", &valorebuf);
		sprintf(endmesg, "%d", valorebuf);

		if (readlenbuf == 0) {;
			printf("Read error... \n");
			sleep(1);
			//system("sudo node provaBLE &"); FAI PARTIRE IL SERVIZIO!!!!!!!
		}
		else {;
			/*printf("Buf Data Received (Read %d bytes): %s - valore %d\n", readlenbuf, buf, valorebuf);*/

			strcpy(recmesg,initmesg);
			strcat(recmesg, endmesg);

			/*printf("Inizio: %s - fine %s\n", initmesg, endmesg);
			printf("Messaggio pulito ricevuto: %s\n", recmesg);*/

			MessageCommandExe();


		}

	}

	close(fd);

	/* remove the FIFO */
	unlink(myfifo);

	return 0;

}
